const fs = require('fs')
const yaml = require('js-yaml')
const ejs = require('ejs')
const path = require('path')

const fileName = 'italki-2023-06-19.yml'
const fullPath = path.join(__dirname, '..', 'italki-2023-06-25.yml')

const yamlData = fs.readFileSync(fullPath, 'utf8')
const jsonData = yaml.load(yamlData)

const html = ejs.render(`    
<!DOCTYPE html>
<html>
    <head>
        <style>
            body {
                font-family: Arial, sans-serif;
            }
            .pron {
                color: #666;
            }
            .trans {
                color: #999;
            }
        </style>
    </head>
    <body>
        <table>
            <tbody>
                <% data.forEach(item => { %>
                    <tr>
                        <td>
                            <strong><%= item.word %></strong>
                        </td>
                        <td class='pron'>
                            <%= item.pron %>
                        </td>
                        <td class='trans'>
                            <%= item.trans %>
                        </td>
                        <td>
                            <% for (const char in (item.chars || {})) { %>
                                <p><%= char %>: <%= item.chars[char] %></p>
                            <% } %>
                        </td>
                    </tr>
                <% }) %>
            </tbody>
        </table>
    </body>
</html>
`, { data: jsonData })

fs.writeFileSync('output.html', html, 'utf8')
