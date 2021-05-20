import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addAlert } from '../actions/actions';

export const useFetchHook = (endpoint) => {
  const dispatch = useDispatch();
  const [ loading, setLoading ] = useState(true);

  const getData = async (endpoint) => {
    setLoading(true);

    try {
      await dispatch(endpoint);
    } catch (error) {
      await dispatch(addAlert(error, 'error'));
    }
    setLoading(false);
  };

  useEffect(() => {
    getData(endpoint)
  }, [])
  
  return [loading];
};
