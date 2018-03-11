import * as cheerio from 'cheerio';
import { Stream, Writable } from 'stream';
import { createReadStream, createWriteStream } from 'fs';
import { promisify } from 'util';

export type Input = string | Stream;
export type Output = string | {write(msg: string): void} | null;
export interface Rule {
    ($: CheerioStatic, report: (msg: string) => void): void;
};

export class HtmlValidator {
    constructor(private rules: Rule[]) {}

    async process(input: Input, output: Output) {
        let inputStream =
            typeof input === 'string' ? createReadStream(input)
            : input && typeof input.on === 'function' ? input
            : error('input: expecting filename or readable stream as input')
    
        var writer =
            !output ? new ConsoleWriter
            : typeof output === 'string' ? new FileWriter(output)
            : typeof output.write === 'function' ? new StreamWriter(output)
            : error('output: expecting filename or writable stream');
        
        let data = await consumeStream(inputStream);
        let cheerioDom = cheerio.load(data);
        
        for(let rule of this.rules) {
            rule(cheerioDom, msg => {
                writer.write(msg + '\n');
            });
        }

        await writer.close();
    }
}

class StreamWriter {
    constructor(private stream: {write(msg: string): void}) {}

    write(msg : string) {
        this.stream.write(msg);
    }

    async close() {}
}

class ConsoleWriter {
    async write(msg: string) {
        console.log(msg);
    }

    async close() {}
}

class FileWriter {
    error?: any;
    stream = createWriteStream(this.filename, {flags: 'w'});
    
    constructor(private filename: string) {
        this.stream.on('error', err => { this.error = err });
    }

    write(msg: string) {
        if(this.error) throw this.error;
        this.stream.write(msg);
    }

    async close() {
        if(this.error) throw this.error;

        return new Promise((resolve, reject) => {
            this.stream.on('error', reject);
            this.stream.on('finish', () => {
                this.stream.close();
                this.stream.destroy();
                resolve();
            });
            this.stream.end();
        })
    }
}

function consumeStream(stream: Stream) : Promise<string> {
    return new Promise((resolve, reject) => {
        let data = '';
        stream.on('data', chunk => {
            data += chunk;
        });
        stream.on('end', () => {
            resolve(data);
        });
        stream.on('error', reject);
    });
}

function error(msg: string): never {
    throw new Error(msg);
}