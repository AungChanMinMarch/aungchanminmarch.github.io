const fs = require('fs');
const path = require('path');

module.exports = function(){
    function generateTOC(directory) {
      const items = fs.readdirSync(directory);

      if (!items.length) {
        return '';
      }

      let toc = '';
      for (const item of items) {
        const itemPath = path.join(directory, item);
        const stat = fs.statSync(itemPath);

        if (stat.isDirectory()) {
          const folderName = item.replace("ch0", "Chapter ");
          toc += `<details> <summary>${folderName.replace("ch", "Chapter ")}</summary>`;
          toc += generateTOC(itemPath);
          toc += `</details>`;
        } else if (item.endsWith('.html')) {
          const fileName = item
            .replace('.html', ' ')
            .replace('theorem-', 'Theorem ')
            .replace('ex-', 'Exercise ')
            .replace('-', '.');
          const anchorLink = '/analysis' + itemPath.split('/src/analysis')[1];

          toc += `<a href=${anchorLink}>${fileName}</a>`;
        }
      }

      return toc;
    }
    const folderName =  this.page.inputPath.replace("./", "").split('/').slice(0,-1).join("/")

    const srcPath = path.join(process.cwd(), folderName); // Adjust the path as needed
    const toc = generateTOC(srcPath);
    return toc;
}
