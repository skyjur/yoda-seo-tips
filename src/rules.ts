export function mustHaveAttribute(tagName: string, attribute: string, message: (errorCount: number) => string) {
    return function ($: CheerioStatic, report: (msg: string) => void) {
        let errorCount = 0;
        $(tagName).each((i, e) => {
            if(e.attribs[attribute] === undefined) {
                errorCount += 1;
            }
        });
        if(errorCount > 0) {
            report(message(errorCount));
        }
    }
}

export function mustHaveElement(selector: string, message: () => string) {
    return function ($: CheerioStatic, report: (msg: string) => void) {
        if($(selector).length == 0) {
            report(message());
        }
    }
}

export function mustHaveNoMoreThan(selector: string, howMany: number, message: (n: number) => string) {
    return function ($: CheerioStatic, report: (msg: string) => void) {
        if($(selector).length > howMany) {
            report(message($(selector).length));
        }
    }
}