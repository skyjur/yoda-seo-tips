import {mustHaveAttribute, mustHaveElement, mustHaveNoMoreThan} from './rules';
import { Rule } from './validator';

// Yoda talks in Object-Subject-Verb grammar, trying to immitate it in the messages here
// https://en.wikipedia.org/wiki/Object%E2%80%93subject%E2%80%93verb

export const imgMustHaveAlt = mustHaveAttribute('img', 'alt', n =>
    `alt attribute in <img> tag there should be`);

export const aMustHaveRel = mustHaveAttribute('a', 'rel', n =>
    `rel attribute in <a> tag there should be`);

export const mustHaveTitle = mustHaveElement('head > title', () =>
    `<title> tag this document should have`);

export const mustHaveDescription = mustHaveElement('head > meta[name=description]', () =>
    `<meta name="descriptions"> tag this docuument should have`);

export const mustHaveKeywords = mustHaveElement('head > meta[name=keywords]', () =>
    `<meta name="keywords"> tag this document should have`);

export const notTooManyStrongs = (howMany: number) => mustHaveNoMoreThan('strong', howMany, (n) =>
    `${n} <strong> tags I count. More than ${howMany} should be not.`);

export const onlyOneH1 = mustHaveNoMoreThan('h1', 1, (n) =>
    `${n} <h1> tags I count. One only chosen there should be.`)

export type YodaWisdomConfig = {
    maxStrongTags?: number,
    extraRules?: Rule[]
};

export function yodaWisdom(config: YodaWisdomConfig = {}): Rule[] {
    return [
        imgMustHaveAlt,
        aMustHaveRel,
        mustHaveTitle,
        mustHaveDescription,
        mustHaveKeywords,
        notTooManyStrongs(config.maxStrongTags || 15),
        onlyOneH1,
        ... (config.extraRules || [])
    ];
}