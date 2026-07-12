import { HiOutlineMagnifyingGlass } from 'react-icons/hi2';
import Input from './Input';

function SearchInput({
  placeholder = 'Search...',
  value,
  onChange,
  disabled = false,
  className = '',
  ...props
}) {
  return (
    <Input
      type="search"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className={className}
      leftIcon={<HiOutlineMagnifyingGlass size={18} />}
      aria-label={props['aria-label'] || placeholder}
      {...props}
    />
  );
}

export default SearchInput;
