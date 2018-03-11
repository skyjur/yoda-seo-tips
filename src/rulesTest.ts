import * as assert from 'assert';
import * as cheerio from 'cheerio';
import {mustHaveAttribute, mustHaveElement, mustHaveNoMoreThan} from './rules';

describe('Rules test', () => {
    it('mustHaveAttribute', () => {
        let r = mustHaveAttribute('img', 'alt', () => 'error1');
        assertRule(r, '<img alt="">', []);
        assertRule(r, '<img >', ['error1']);
    });

    it('mustHaveElement', () => {
        let r = mustHaveElement('head > title', () => 'error2');
        assertRule(r, '<head><title></title></head>', []);
        assertRule(r, '', ['error2']);
    });

    it('mustHaveNoMoreThan', () => {
        let r = mustHaveNoMoreThan('b', 2, () => 'error3');
        assertRule(r, '<b></b><b></b>', []);
        assertRule(r, '<b></b><b></b><b></b>', ['error3']);
    });

    function assertRule(rule: any, doc: any, expectedReports: any) {
        let reports: any[] = [];
        rule(cheerio.load(doc), (msg: any) => reports.push(msg));
        assert.deepEqual(reports, expectedReports);
    }
})