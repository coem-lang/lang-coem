import {parser} from "./coem.grammar"
import {SyntaxNode} from "@lezer/common"
import {delimitedIndent, indentNodeProp, TreeIndentContext, LRLanguage, LanguageSupport} from "@codemirror/language"
import {styleTags, tags as t} from "@codemirror/highlight"

// https://github.com/codemirror/lang-python/blob/main/src/python.ts
function indentBody(context: TreeIndentContext, node: SyntaxNode) {
  let base = context.lineIndent(node.from)
  let line = context.lineAt(context.pos, -1), to = line.from + line.text.length
  // Don't consider blank, deindented lines at the end of the
  // block part of the block
  if (!/\S/.test(line.text) &&
      context.node.to < to + 100 &&
      !/\S/.test(context.state.sliceDoc(to, context.node.to)) &&
      context.lineIndent(context.pos, -1) <= base)
    return null
  // A normally deindenting keyword that appears at a higher
  // indentation than the block should probably be handled by the next
  // level
  if (/^\s*(else:|else if:)/.test(context.textAfter) && context.lineIndent(context.pos, -1) > base)
    return null
  return base + context.unit
}

/// A language provider based on the Coem parser,
/// extended with highlighting and indentation information.
export const coemLanguage = LRLanguage.define({
  parser: parser.configure({
    props: [
      indentNodeProp.add({
        Body: context => indentBody(context, context.node) ?? context.continue(),
        IfStatement: cx => /^\s*(else:|else if:)/.test(cx.textAfter) ? cx.baseIndent : cx.continue(),
        "ParamList ArgList": delimitedIndent({closing: "—"}),
        Script: context => {
          if (context.pos + /\s*/.exec(context.textAfter)![0].length >= context.node.to) {
            let endBody = null
            for (let cur: SyntaxNode | null = context.node, to = cur.to;;) {
              cur = cur.lastChild
              if (!cur || cur.to != to) break
              if (cur.type.name == "Body") endBody = cur
            }
            if (endBody) {
              let bodyIndent = indentBody(context, endBody)
              if (bodyIndent != null) return bodyIndent
            }
          }
          return context.continue()
        }
      }),
      styleTags({
        "while if else": t.controlKeyword,
        "not and or is am are": t.operatorKeyword,
        "let to": t.definitionKeyword,
        "be": t.operatorKeyword,
        "print say know": t.keyword,
        Boolean: t.bool,
        Nothing: t.null,
        VariableName: t.variableName,
        "CallExpression/VariableName": t.function(t.definition(t.variableName)),
        "FunctionDefinition/VariableName": t.function(t.definition(t.variableName)),
        Comment: t.lineComment,
        DirectiveStatement: t.lineComment,
        String: t.string,
        "—": t.bracket,
        ",": t.separator
      })
    ],
    strict: false
  }),
  languageData: {
    commentTokens: {line: "†"},
    indentOnInput: /^\s*([\}\]\)]|else:|else if:)$/
  }
})

/// Coem language support.
export function coem() {
  return new LanguageSupport(coemLanguage)
}
