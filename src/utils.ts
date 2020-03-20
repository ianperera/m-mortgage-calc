import { CustomInput, CustomInputType } from '@/models/input'

export const parseInputValue = (value: string, type: CustomInputType): CustomInput => {
	let newValue: CustomInput = { number: 0, value: '' };
	let endChar = '';
	const formatter = new Intl.NumberFormat('en-US');

	switch (type) {
		case 'Currency':
			const currencyValue = value.replace(/[^0-9.]/g, '');
			newValue = {
				value: currencyValue && formatter.format(parseInt(currencyValue)),
				number: currencyValue && parseInt(currencyValue),
			}
			break;
		case 'Integer':
			if (value[value.length - 1] === '.') {
				endChar = '.';
			}
			if (value.indexOf('.') >= 0 && value.indexOf('.') === value.length - 4) {
				return;
			}
			const intValue = value.replace(/[^0-9\.]/g, '');
			newValue = {
				value: intValue && formatter.format(parseFloat(intValue)) + endChar,
				number: intValue && parseFloat(intValue),
			}
			break;
		default:
			newValue = { value: value };
	}

	return newValue;
}