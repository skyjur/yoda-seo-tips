import * as sinon from 'sinon';
import * as assert from 'assert';
import { HtmlValidator } from './index';
import { createReadStream, readFileSync, unlinkSync } from 'fs';

describe('Html Validator Framework', () => {
    var validator = new HtmlValidator([
        ($, report) => {
            assert.equal($('html').length, 1);
            report('test rule 1');
        },
        ($, report) => {
            assert.equal($('html').length, 1);
            report('test rule 2');
        }
    ]);

    it('Should load html from file', async () => {
        let output = outputStub();
        await validator.process(__dirname + '/sample.html', output);
        assert.equal(output.get(), 'test rule 1\ntest rule 2\n');
    });
    
    it('Should load html from stream', async () => {
        let output = outputStub();
        await validator.process(createReadStream(__dirname + '/sample.html'), output);
        assert.equal(output.get(), 'test rule 1\ntest rule 2\n');
    });

    it('Should write output to file', async () => {
        let outFileName = __filename + '.out';
        await validator.process(__dirname + '/sample.html', outFileName);
        assert.equal(readFileSync(outFileName).toString(), 'test rule 1\ntest rule 2\n');
        unlinkSync(outFileName);
    });

    it('Should throw IO error due to invalid file name', async () => {
        let outFileName = '/?*".out';
        try {
            await validator.process(__dirname + '/sample.html', outFileName);
            assert.fail('Exception not raised')
        } catch(e) {
            assert.equal(e.message && e.message.substr(0, 7), 'ENOENT:');
        }
    })
});

function outputStub() {
    let out = '';
    return {
        write(msg: string) { out += msg; },
        get() { return out; }
    }
}