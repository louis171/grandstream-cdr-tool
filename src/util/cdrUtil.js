const fixGsData = (data) => {
  // Break returned CDR array into objects
  data.forEach((row) => {
    // Check the length of objects. Continues if below 44
    if (Object.keys(row).length < 44) {
      // if the length of the object is below 44 then create a new array of the object using the keys of each child object
      let arr = Object.keys(row).map((k) => row[k]);
      // Filter array to remove empty or blank objects
      arr = arr.filter((n) => n);
      // Add each object of the new array created above to the existing CDRData array
      arr.forEach((subRow) => {
        data = [...data, subRow];
      });
      // Get the index of the row being processed
      const index = data.indexOf(row);
      // If the index is greater than -1. e.i. the data is present
      if (index > -1) {
        // Removes 1 element in the array from the index position. i.e. deletes the incorrect object
        data.splice(index, 1);
      }
    }
  });
  // Returns fixed data
  return data;
};

const fixTableData = (data) => {
  // break data into objects
  data.forEach((row) => {
    // Removes empty cdr object that is often returned from UCM63XX PBXs
    // e.g. cdr: ""
    delete row["cdr"];
    // Creates new empty array
    let arr = [];
    // Iterates through the keys of the object
    for (const key in row) {
      // .hasOwnProperty returns a boolean indicating whether the object has the specified property
      // .call allows another object to be substituted (in this case the row) where we look for the keys
      if (Object.hasOwnProperty.call(row, key)) {
        const element = row[key];
        // checks the type of the returned element looking for objects
        if (typeof element === "object") {
          // if the returned element is an object then add to the array
          arr.push(element);
        }
      }
    }
    // If the array has any content then add back to the original data
    if (arr.length > 0) {
      data = [...data, arr];
    } else {
      data = [...data, [row]];
    }
    // find index of the row being processed
    const index = data.indexOf(row);

    // If the indexed row exists
    if (index > -1) {
      // Removes 1 element in the array from the index position
      // i.e. remove the old object from the data
      data.splice(index, 1);
    }
  });
  return data;
};

const cdrUtil = {
  fixGsData: fixGsData,
  fixTableData: fixTableData
};

export default cdrUtil;
