# Yoda SEO Tips

[![CircleCI](https://circleci.com/gh/skyjur/yoda-seo-tips.svg?style=svg)](https://circleci.com/gh/skyjur/yoda-seo-tips)
[![NPM](https://nodei.co/npm/yoda-seo-tips.png)](https://nodei.co/npm/yoda-seo-tips/)

Get tips about SEO for your html code from Grand Master Yoda.

![](yoda.jpg)

```
<title> tag this document should have
16 <strong> tags I count. More than 15 should be not.
```

Install:

```sh
npm i yoda-seo-tips
```

Basic use:
```js
import validate from "yoda-seo-tips"
validate('empty.html')
```

With settings:
```
validate('sample2.html', null, {
    maxStrongTags: 2,
    extraRules: [
        mustHaveElement('article', () => '<article> is required')
    ]
})
```

Overwrite default rules with custom rules:
```js
import {mustHaveElement, imgMustHaveAlt} from "yoda-seo-tips"
validate('sample1.html', null, [
    imgMustHaveAlt,
    mustHaveElement('article', () => '<article> is required'),
    ($, report) => {
        if($('title').text() == '') {
            report('Title should not be empty');
        }
    }
])
```
See
[`src/rules.ts`](src/rules.ts)
and [`src/yodaWisdom.ts`](src/yodaWisdom.ts)
for more samples on rule definitions.
