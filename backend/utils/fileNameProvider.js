//This function takes in the name of file, and returns it without the extension. 'myfile.jpg' will return as 'myfile'

function fileNameProvider(name) {
  return name
    .split(".")
    .slice(0, -1)
    .join(".")
    .trim()
    .replaceAll(/\s+/g, "-")
    .toLowerCase();
}


export default fileNameProvider;


