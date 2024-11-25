/* eslint-disable max-lines-per-function */
import { useCallback, useEffect, useRef, useState } from 'react';
import mapValues from 'lodash/mapValues';
import { useDispatch } from 'react-redux';
import {
  addRows,
  fetchTablePage,
  fetchTableFilters,
  toggleSlider,
  applyUrlParams,
} from './reducers/glTableActions';
import useTableState from './useTableState';

const useGLTable = ({
  remoteApi,
  remoteFiltersApi,
  namespace,
  namespaceScope,
  rows,
  columnDefs,
  nonTagFilters,
  availableFiltersProp,
  remoteVersionRequirement,
  onRenderComplete,
  searchBy,
  noPagination,
  customFilters,
  uniqueKey,
  dropdownUniqueKey,
  sliderParamName,
}) => {
  const isMounted = useRef(false);
  const dispatch = useDispatch();
  const tableState = useTableState(namespace, namespaceScope);
  const [initialLoadDone, setInitialLoadDone] = useState(false);
  const [urlSliderId, setUrlSliderId] = useState(null);

  const {
    search,
    filters,
    page,
    pageSize,
    urlParams,
    sorting,
    remote: { latestRemoteVersionTimestamp },
  } = tableState;

  useEffect(() => {
    dispatch(
      addRows(namespace, {
        rows,
        columnDefs,
        nonTagFilters,
        filters: mapValues(availableFiltersProp, () => []), // empty arrays
        availableFilters: availableFiltersProp, // filters with items
        customFilters,
        isRemote: !!remoteApi,
        onRenderComplete,
        searchBy,
        noPagination,
        uniqueKey,
        dropdownUniqueKey,
      })
    );
    // We use availableFiltersProp only on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [remoteApi, columnDefs, dispatch, namespace, nonTagFilters, rows]);

  useEffect(() => {
    if (remoteApi) {
      if (isMounted.current) {
        // When search changes we want to have some debounce to API calls
        const remoteApiTimeout = setTimeout(() => {
          dispatch(
            fetchTablePage(namespace, {
              remoteApi,
              search,
              filters,
              sorting,
              page,
              pageSize,
              urlParams,
            })
          );
        }, 1000);

        return () => {
          clearTimeout(remoteApiTimeout);
        };
      } else {
        isMounted.current = true;
      }
    }
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, remoteApi, search]);

  useEffect(() => {
    // When filters, sorting or paging changes we want to fire an API call immediately
    if (remoteApi) {
      dispatch(
        fetchTablePage(namespace, {
          remoteApi,
          search,
          filters,
          sorting,
          page,
          pageSize,
          urlParams,
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, remoteApi, namespace, filters, sorting, page, pageSize, urlParams]);

  useEffect(() => {
    // When a newer page version is required
    if (remoteApi && remoteVersionRequirement > latestRemoteVersionTimestamp) {
      dispatch(
        fetchTablePage(namespace, {
          remoteApi,
          search,
          filters,
          sorting,
          page,
          pageSize,
          urlParams,
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, remoteApi, namespace, remoteVersionRequirement]);

  useEffect(() => {
    if (remoteFiltersApi) {
      dispatch(fetchTableFilters(namespace, { remoteFiltersApi }));
    }
  }, [dispatch, namespace, remoteFiltersApi]);

  const handleURLParams = useCallback(() => {
    if (!initialLoadDone && sliderParamName) {
      const params = new URLSearchParams(window.location.search);

      let sliderId;

      if (typeof sliderParamName === 'object') {
        sliderId = params.get(sliderParamName.display);
      } else {
        sliderId = params.get(sliderParamName);
      }

      if (sliderId) {
        dispatch(applyUrlParams(namespace, sliderId));
        setUrlSliderId(sliderId);
      }

      setInitialLoadDone(true);
    }
  }, [dispatch, initialLoadDone, namespace, sliderParamName]);

  useEffect(() => {
    if (urlSliderId && tableState.rows.length > 0) {
      let valueKey;

      if (typeof sliderParamName === 'object') {
        valueKey = sliderParamName.value;
      } else {
        valueKey = sliderParamName;
      }

      const rowToOpen = tableState.rows.find(row => row[valueKey]?.toString() === urlSliderId);
      if (rowToOpen) {
        dispatch(toggleSlider(namespace, { row: rowToOpen, sliderParamName, sliderId: urlSliderId }));
        setUrlSliderId(null); // Reset the urlSliderId after opening the slider
      }
    }
  }, [urlSliderId, tableState.rows, dispatch, namespace, sliderParamName]);

  useEffect(() => {
    handleURLParams();
  }, [handleURLParams]);

  useEffect(() => {
    const handlePopState = () => {
      setInitialLoadDone(false);
      handleURLParams();
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [handleURLParams]);

  return {
    initialLoadDone,
    setInitialLoadDone,
  };
};

export default useGLTable;
