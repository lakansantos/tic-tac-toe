import {useRouter, useSearchParams} from 'next/navigation';
import {SyntheticEvent, useState} from 'react';

const useSearchGameById = () => {
  const searchParams = useSearchParams();
  const searchedDefaultValue = searchParams.get('search') || '';

  const [searchedValue, setSearchedValue] = useState(searchedDefaultValue);

  const router = useRouter();

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
