import fs from "fs";
import path from "path";

function getDirectories(source, toc) {
  // const children = fs.readdirSync(source, { withFileTypes: true })
  // const childrenDir =  children.filter(dirent => dirent.isDirectory())
  // if(childrenDir.length === 0){
  //   return children.map(dir => dir.name);
  // }
  // childrenDir.forEach(function(child){
  //   const entryPath = path.join(source, child.name);
  //   toc[child]: {};
  // })
}

const getToc = function (posts) {
  // const contentPath = path.join(process.cwd(), 'src/content', contentPath);
  // let toc = {};
  // fs.readdirSync(contentPath, { withFileTypes: true})
  //   .filter(dirent => dirent.isDirectory())
  //   .forEach(function (dir){
  //     toc[dir]
  //   })
  // const topLevelFolders = getDirectories(contentPath);

  // const toc = topLevelFolders.map(folder => {
  //   const subfolders = getDirectories(path.join(contentPath, folder));
  //   return {
  //     name: folder,
  //     subfolders
  //   };
  // });
  return posts;
};

export default getToc;
