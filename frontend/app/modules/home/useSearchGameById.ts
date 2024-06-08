import {useRouter, useSearchParams} from 'next/navigation';
import {SyntheticEvent, useState} from 'react';

const useSearchGameById = () => {
  const [searchedValue, setSearchedValue] = useState('');

  const router = useRouter();

  const searchParams = useSearchParams();
  const searchedDefaultValue = searchedValue
    ? searchedValue
    : searchParams.get('search');

  const onSearch = (e: SyntheticEvent) => {
    e.preventDefault();
    router.push(searchedValue ? `/?search=${searchedValue}` : '/');
  };

  return {
    searchedValue,
    searchedDefaultValue,
    setSearchedValue,
    onSearch,
  };
};

export default useSearchGameById;
