//This function takes in the name of file, and returns it without the extension. 'myfile.jpg' will return as 'myfile'

function fileNameProvider(name) {
  const splitName = name.split(".");
  splitName.pop();
  const splitNameJoin = splitName.join(".");
  return splitNameJoin;
}

export default fileNameProvider;
