# Yoda SEO Tips

Get tips about SEO for your html code from Grand Master Yoda.

![](yoda.jpg)

```
<title> tag this document should have
16 <strong> tags I count. More than 15 should be not.
```

Basic use:
```js
import validate from "yoda-seo-tips"
validate('empty.html')
```

With settings:
```
validate('sample2.html', null, {maxStrongTags: 2})
```

Custom rules:
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