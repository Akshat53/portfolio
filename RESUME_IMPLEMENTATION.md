# Résumé

`/resume` renders `lib/resume-data.ts` as a one-page A4 document.

- **On screen** it sits inside the site's Signal UI: the sheet feeds out of a "printer slot", with a section index, copy-email and links back to the site.
- **PDF**: `public/Akshat_Kumar_Singh_Resume.pdf` is real, selectable text, so applicant-tracking systems read every word. It is generated from the page's print stylesheet, not a screenshot.
- **Print** (button or Ctrl+P) uses the same print stylesheet, so it also comes out as one page.
- **.txt** builds a plain-text version in the browser for pasting into application forms.

## After editing `lib/resume-data.ts`, regenerate the PDF

```bash
npm run build && npm start           # terminal 1
npm run resume:pdf                   # terminal 2 (CHROME_PATH=/path/to/chrome if Chrome isn't installed system-wide)
```

The script **fails rather than writing a 2-page PDF**. If it fails, lower `--print-k` in
`app/resume/resume.css` (the print text scale, currently 0.92) or trim the data.
