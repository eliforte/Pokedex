const useAddLeadingZeros = (num: number, totalLength: number) => String(num).padStart(totalLength, '0');

export default useAddLeadingZeros;
