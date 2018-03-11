import { HtmlValidator, Input, Output, Rule } from "./validator";
import { yodaWisdom, YodaWisdomConfig } from "./yodaWisdom";

export default function yodaValidateHtml(input: Input, output: Output | null = null, config: YodaWisdomConfig | Rule[] = {}) {
    let rules = config instanceof Array ? config : yodaWisdom(config);
    let validator = new HtmlValidator(rules);
    return validator.process(input, output);
}

export * from "./rules";
export * from "./yodaWisdom";