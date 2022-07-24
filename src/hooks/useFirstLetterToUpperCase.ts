const useFirstLetterToUpperCase = (str: string) => {
  const newText = str ? str[0].toLocaleUpperCase() + str.slice(1) : '';
  return newText;
};

export default useFirstLetterToUpperCase;
