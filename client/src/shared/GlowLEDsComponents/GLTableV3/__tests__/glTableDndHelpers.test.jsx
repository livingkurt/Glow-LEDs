/* eslint-disable max-lines */
/* eslint-disable max-lines-per-function */
import {
  reorderBetweenColumns,
  reorder,
  updateItemOrder,
  onDragEnd,
  onDragEndDropdown,
  moveItemBetweenArrays,
} from '../glTableDndHelpers';
import { reorderDropdownRows } from '../reducers/glTableActions';

jest.mock('../reducers/glTableActions', () => ({
  reorderDropdownRows: jest.fn(),
  reorderRows: jest.fn(),
}));

describe('glTableDndHelpers', () => {
  describe('reorderBetweenColumns', () => {
    it('should move an item from source to destination', () => {
      const sourceColumn = { page: 0, pageSize: 5, rows: ['item1', 'item2', 'item3', 'item4', 'item5'] };
      const destColumn = { page: 0, pageSize: 5, rows: ['item6', 'item7', 'item8', 'item9', 'item10'] };
      const source = { index: 1 };
      const destination = { index: 3 };

      const result = reorderBetweenColumns(sourceColumn, destColumn, source, destination);

      expect(result).toEqual({
        newSourceRows: ['item1', 'item3', 'item4', 'item5'],
        newDestRows: ['item6', 'item7', 'item8', 'item2', 'item9', 'item10'],
        movedItem: 'item2',
      });
    });

    it('should append to the end if destination index is out of bounds', () => {
      const sourceColumn = { page: 0, pageSize: 5, rows: ['item1', 'item2', 'item3', 'item4', 'item5'] };
      const destColumn = { page: 0, pageSize: 5, rows: ['item6', 'item7', 'item8', 'item9', 'item10'] };
      const source = { index: 0 };
      const destination = { index: 10 };

      const result = reorderBetweenColumns(sourceColumn, destColumn, source, destination);

      expect(result).toEqual({
        newSourceRows: ['item2', 'item3', 'item4', 'item5'],
        newDestRows: ['item6', 'item7', 'item8', 'item9', 'item10', 'item1'],
        movedItem: 'item1',
      });
    });
  });

  describe('reorder', () => {
    it('should reorder the list by moving an item from the start index to the end index', () => {
      const list = ['item1', 'item2', 'item3', 'item4', 'item5'];
      const startIndex = 0;
      const endIndex = 2;

      const result = reorder(list, startIndex, endIndex);

      expect(result).toEqual(['item2', 'item3', 'item1', 'item4', 'item5']);
    });

    it('should return the same list if the start index and end index are the same', () => {
      const list = ['item1', 'item2', 'item3', 'item4', 'item5'];
      const startIndex = 2;
      const endIndex = 2;

      const result = reorder(list, startIndex, endIndex);

      expect(result).toEqual(['item1', 'item2', 'item3', 'item4', 'item5']);
    });

    it('should handle the case where the end index is greater than the length of the list', () => {
      const list = ['item1', 'item2', 'item3', 'item4', 'item5'];
      const startIndex = 1;
      const endIndex = 10;

      const result = reorder(list, startIndex, endIndex);

      expect(result).toEqual(['item1', 'item3', 'item4', 'item5', 'item2']);
    });
  });

  describe('moveItemBetweenArrays', () => {
    it('should move an item from source array to destination array', () => {
      const sourceArray = [1, 2, 3, 4];
      const destinationArray = [5, 6, 7];
      const sourceIndex = 1;
      const destinationIndex = 2;

      const result = moveItemBetweenArrays(sourceArray, destinationArray, sourceIndex, destinationIndex);

      expect(result.sourceArray).toEqual([1, 3, 4]);
      expect(result.destinationArray).toEqual([5, 6, 2, 7]);
    });

    it('should handle moving to the beginning of the destination array', () => {
      const sourceArray = ['a', 'b', 'c'];
      const destinationArray = ['d', 'e', 'f'];
      const sourceIndex = 0;
      const destinationIndex = 0;

      const result = moveItemBetweenArrays(sourceArray, destinationArray, sourceIndex, destinationIndex);

      expect(result.sourceArray).toEqual(['b', 'c']);
      expect(result.destinationArray).toEqual(['a', 'd', 'e', 'f']);
    });

    it('should handle moving to the end of the destination array', () => {
      const sourceArray = [1, 2, 3];
      const destinationArray = [4, 5, 6];
      const sourceIndex = 2;
      const destinationIndex = 3;

      const result = moveItemBetweenArrays(sourceArray, destinationArray, sourceIndex, destinationIndex);

      expect(result.sourceArray).toEqual([1, 2]);
      expect(result.destinationArray).toEqual([4, 5, 6, 3]);
    });

    it('should not modify the original arrays', () => {
      const sourceArray = ['x', 'y', 'z'];
      const destinationArray = ['a', 'b', 'c'];
      const sourceIndex = 1;
      const destinationIndex = 1;

      moveItemBetweenArrays(sourceArray, destinationArray, sourceIndex, destinationIndex);

      expect(sourceArray).toEqual(['x', 'y', 'z']);
      expect(destinationArray).toEqual(['a', 'b', 'c']);
    });

    it('should handle empty source array', () => {
      const sourceArray = [];
      const destinationArray = [1, 2, 3];
      const sourceIndex = 0;
      const destinationIndex = 1;

      const result = moveItemBetweenArrays(sourceArray, destinationArray, sourceIndex, destinationIndex);

      expect(result.sourceArray).toEqual([]);
      expect(result.destinationArray).toEqual([1, 2, 3]);
    });

    it('should handle empty destination array', () => {
      const sourceArray = [1, 2, 3];
      const destinationArray = [];
      const sourceIndex = 1;
      const destinationIndex = 0;

      const result = moveItemBetweenArrays(sourceArray, destinationArray, sourceIndex, destinationIndex);

      expect(result.sourceArray).toEqual([1, 3]);
      expect(result.destinationArray).toEqual([2]);
    });
  });

  describe('updateItemOrder', () => {
    it('should update item order when starting from the first page', () => {
      const updateItemsData = {
        items: [
          {
            id: 10,
            rank: 1,
          },
          {
            id: 6,
            rank: 2,
          },
          {
            id: 5,
            rank: 3,
          },
        ],
        orderAttribute: 'rank',
        columnId: 'backlog',
      };
      const expectedUpdatedColumnData = [
        {
          id: 10,
          rank: 1,
        },
        {
          id: 6,
          rank: 2,
        },
        {
          id: 5,
          rank: 3,
        },
      ];
      const updatedColumnData = updateItemOrder(updateItemsData);
      expect(updatedColumnData).toEqual(expectedUpdatedColumnData);
    });

    it('should handle empty items array', () => {
      const updateItemsData = {
        items: [],
        orderAttribute: 'rank',
        columnId: 'backlog',
      };

      const expected = [];

      const actual = updateItemOrder(updateItemsData);
      expect(actual).toEqual(expected);
    });

    it('should handle different attribute names', () => {
      const updateItemsData = {
        items: [
          { id: 10, rank: 1, status: 'backlog' },
          { id: 6, rank: 2, status: 'backlog' },
          { id: 5, rank: 3, status: 'backlog' },
        ],
        orderAttribute: 'rank',
        columnId: 'backlog',
      };
      const expected = [
        { id: 10, status: 'backlog', rank: 1 },
        { id: 6, status: 'backlog', rank: 2 },
        { id: 5, status: 'backlog', rank: 3 },
      ];

      const actual = updateItemOrder(updateItemsData);
      expect(actual).toEqual(expected);
    });
  });

  describe('onDragEnd', () => {
    it('should return early if destination is not defined', () => {
      const dispatch = jest.fn();
      const result = { source: { index: 0 }, destination: null };
      const tableState = { rows: ['row1', 'row2'], page: 0, pageSize: 2 };
      const namespace = 'test';
      const remoteReorderApi = jest.fn();
      const orderAttribute = 'order';

      onDragEnd({ result, dispatch, tableState, namespace, remoteReorderApi, orderAttribute });

      expect(dispatch).not.toHaveBeenCalled();
    });

    it('should reorder rows and dispatch reorderRows action if destination is defined', () => {
      const dispatch = jest.fn();
      const result = { source: { index: 0 }, destination: { index: 1 } };
      const tableState = {
        rows: [
          { id: 0, order: 0, name: 'row1' },
          { id: 1, order: 1, name: 'row2' },
        ],
        page: 0,
        pageSize: 2,
      };
      const namespace = 'test';
      const remoteReorderApi = jest.fn();
      const orderAttribute = 'order';

      const { updatedReorderedItems } = onDragEnd({
        result,
        dispatch,
        tableState,
        namespace,
        remoteReorderApi,
        orderAttribute,
      });
      expect(updatedReorderedItems).toEqual([
        { id: 1, order: 1, name: 'row2' },
        { id: 0, order: 2, name: 'row1' },
      ]);
    });
  });

  describe('onDragEndDropdown', () => {
    const mockDispatch = jest.fn();
    const mockRemoteReorderDropdownApi = jest.fn();
    const namespace = 'testNamespace';
    const uniqueKey = 'id';
    const dropdownOrderAttribute = 'order';
    const dropdownRowsUniqueKey = 'items';

    const initialState = {
      rows: [
        {
          id: 1,
          items: [
            { id: 101, name: 'Item 1', order: 0 },
            { id: 102, name: 'Item 2', order: 1 },
            { id: 103, name: 'Item 3', order: 2 },
          ],
        },
        {
          id: 2,
          items: [
            { id: 201, name: 'Item 4', order: 0 },
            { id: 202, name: 'Item 5', order: 1 },
          ],
        },
      ],
    };

    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should return early if destination is null', () => {
      const result = {
        source: { index: 0 },
        destination: null,
        draggableId: `1-101`,
      };

      const output = onDragEndDropdown({
        result,
        dispatch: mockDispatch,
        tableState: initialState,
        namespace,
        remoteReorderDropdownApi: mockRemoteReorderDropdownApi,
        uniqueKey,
        dropdownOrderAttribute,
        dropdownRowsUniqueKey,
      });

      expect(output).toEqual({ updatedReorderedItems: null });
      expect(mockDispatch).not.toHaveBeenCalled();
    });

    it('should reorder items within the same parent', () => {
      const result = {
        source: { index: 0 },
        destination: { index: 2 },
        draggableId: `1-101`,
      };

      onDragEndDropdown({
        result,
        dispatch: mockDispatch,
        tableState: initialState,
        namespace,
        remoteReorderDropdownApi: mockRemoteReorderDropdownApi,
        uniqueKey,
        dropdownOrderAttribute,
        dropdownRowsUniqueKey,
        zeroIndexDropdownRows: false,
      });

      expect(mockDispatch).toHaveBeenCalledWith(
        reorderDropdownRows(namespace, {
          parentId: '1',
          reorderedDropdownItems: [
            { id: 102, name: 'Item 2', order: 1 },
            { id: 103, name: 'Item 3', order: 2 },
            { id: 101, name: 'Item 1', order: 3 },
          ],
          remoteReorderDropdownApi: mockRemoteReorderDropdownApi,
          uniqueKey,
          dropdownRowsUniqueKey,
        })
      );
    });

    it('should not modify rows that do not match the parent id', () => {
      const result = {
        source: { index: 0 },
        destination: { index: 1 },
        draggableId: `1-101`,
      };

      const output = onDragEndDropdown({
        result,
        dispatch: mockDispatch,
        tableState: initialState,
        namespace,
        remoteReorderDropdownApi: mockRemoteReorderDropdownApi,
        uniqueKey,
        dropdownOrderAttribute,
        dropdownRowsUniqueKey,
        zeroIndexDropdownRows: false,
      });

      expect(output.updatedReorderedItems).toHaveLength(3);
      expect(output.updatedReorderedItems).toEqual([
        { 'id': 102, 'name': 'Item 2', 'order': 1 },
        { 'id': 101, 'name': 'Item 1', 'order': 2 },
        { 'id': 103, 'name': 'Item 3', 'order': 3 },
      ]);
    });

    it('should handle reordering when parent id is a number', () => {
      const result = {
        source: { index: 0 },
        destination: { index: 1 },
        draggableId: `2-201`,
      };

      onDragEndDropdown({
        result,
        dispatch: mockDispatch,
        tableState: initialState,
        namespace,
        remoteReorderDropdownApi: mockRemoteReorderDropdownApi,
        uniqueKey,
        dropdownOrderAttribute,
        dropdownRowsUniqueKey,
        zeroIndexDropdownRows: false,
      });

      expect(mockDispatch).toHaveBeenCalledWith(
        reorderDropdownRows(namespace, {
          parentId: '2',
          reorderedDropdownItems: [
            { id: 202, name: 'Item 5', order: 1 },
            { id: 201, name: 'Item 4', order: 2 },
          ],
          remoteReorderDropdownApi: mockRemoteReorderDropdownApi,
          uniqueKey,
          dropdownRowsUniqueKey,
        })
      );
    });
  });
});
