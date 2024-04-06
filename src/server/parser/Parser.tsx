import { parse } from "node-html-parser"

import html from "degreeaudit.html";
import { promises as fs } from 'fs';


export function getHtml() {
  const parsedHTML = fs.readFile(process.cwd() + '/public/degreeaudit.html', 'utf8');

    

  console.log(parsedHTML);
}