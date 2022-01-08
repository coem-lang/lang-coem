# lang-coem

This repository contains:

- A Coem grammar ([`coem.grammar`](https://github.com/coem-lang/lang-coem/blob/main/src/syntax.grammar)) for the [Lezer](https://lezer.codemirror.net/) parser system
- Coem language support ([`index.ts`](https://github.com/coem-lang/lang-coem/blob/main/src/index.ts)) for the [CodeMirror](https://codemirror.net/6/) code editor

## Setup

Build:

```
npm run build
```

Test:

Edit cases in `cases.txt`, then:

```
npm test
```

# API Reference

<dl>
  <dt id="user-content-coem">
    <code><strong><a href="#user-content-coem">coem</a></strong>() → <a href="https://codemirror.net/6/docs/ref#language.LanguageSupport">LanguageSupport</a></code>
  </dt>
  <dd><p>Coem language support.</p></dd>
  <dt id="user-content-coemlanguage">
    <code><strong><a href="#user-content-coemlanguage">coemLanguage</a></strong>: <a href="https://codemirror.net/6/docs/ref#language.LRLanguage">LRLanguage</a></code>
  </dt>
  <dd><p>A language provider based on the Lezer Coem parser, extended with highlighting and indentation information.</p>
</dd>
</dl>

## References

The grammar was largely based on the [Python grammar](https://github.com/lezer-parser/python) and developed with the help of the Lezer [System Guide](https://lezer.codemirror.net/docs/guide/).

Testing for the grammar was informed by the [tests for Python](https://github.com/lezer-parser/python/tree/main/test) and [tests for @lezer/generator](https://github.com/lezer-parser/generator/tree/main/test/cases).

The language support began with the CodeMirror [lang-example](https://github.com/codemirror/lang-example) repository and was largely based on the [Python language support](https://github.com/codemirror/lang-python/blob/main/README.md).