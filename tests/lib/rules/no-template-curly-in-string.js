/**
 * @fileoverview Warn when using template string syntax in regular strings.
 * @author Jeroen Engels
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/no-template-curly-in-string"),
    RuleTester = require("../../../lib/rule-tester/flat-rule-tester");


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();

const messageId = "unexpectedTemplateExpression";

ruleTester.run("no-template-curly-in-string", rule, {
    valid: [
        { code: "`Hello, ${name}`;" },
        { code: "templateFunction`Hello, ${name}`;" },
        { code: "`Hello, name`;" },
        { code: "'Hello, name';" },
        { code: "'Hello, ' + name;" },
        { code: "`Hello, ${index + 1}`" },
        { code: "`Hello, ${name + \" foo\"}`" },
        { code: "`Hello, ${name || \"foo\"}`" },
        { code: "`Hello, ${{foo: \"bar\"}.foo}`" },
        { code: "'$2'" },
        { code: "'${'" },
        { code: "'$}'" },
        { code: "'{foo}'" },
        { code: "'{foo: \"bar\"}'" },
        { code: "const number = 3" }
    ],
    invalid: [
        {
            code: "'Hello, ${name}'",
            errors: [{ messageId }]
        },
        {
            code: "\"Hello, ${name}\"",
            errors: [{ messageId }]
        },
        {
            code: "'${greeting}, ${name}'",
            errors: [{ messageId }]
        },
        {
            code: "'Hello, ${index + 1}'",
            errors: [{ messageId }]
        },
        {
            code: "'Hello, ${name + \" foo\"}'",
            errors: [{ messageId }]
        },
        {
            code: "'Hello, ${name || \"foo\"}'",
            errors: [{ messageId }]
        },
        {
            code: "'Hello, ${{foo: \"bar\"}.foo}'",
            errors: [{ messageId }]
        }
    ]
});
