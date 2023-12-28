const removeFirebasePrefix = (errorMessage) => {
    const regex = /^Firebase: /;
    return errorMessage.replace(regex, '');
  };
  
  export default removeFirebasePrefix