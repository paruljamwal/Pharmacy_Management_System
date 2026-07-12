import { Button, SearchInput, Select } from '../../components/common';
import {
  MEDICINE_CATEGORIES,
  SEARCH_BY_OPTIONS,
  STOCK_STATUS_OPTIONS,
  EXPIRY_OPTIONS,
} from '../../constants/inventory';
import './InventoryToolbar.css';

const categoryOptions = [
  { value: 'all', label: 'All Categories' },
  ...MEDICINE_CATEGORIES.map((category) => ({ value: category, label: category })),
];

function InventoryToolbar({
  search,
  searchBy,
  category,
  stockStatus,
  expiry,
  onSearchChange,
  onSearchByChange,
  onCategoryChange,
  onStockStatusChange,
  onExpiryChange,
  onReset,
}) {
  return (
    <div className="inventory-toolbar">
      <div className="inventory-toolbar__filters">
        <div className="inventory-toolbar__search">
          <SearchInput
            placeholder="Search medicine..."
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            aria-label="Search medicine"
          />
        </div>

        <Select
          className="inventory-toolbar__field"
          aria-label="Search by"
          placeholder=""
          options={SEARCH_BY_OPTIONS}
          value={searchBy}
          onChange={(event) => onSearchByChange(event.target.value)}
        />

        <Select
          className="inventory-toolbar__field"
          aria-label="Category"
          placeholder=""
          options={categoryOptions}
          value={category}
          onChange={(event) => onCategoryChange(event.target.value)}
        />

        <Select
          className="inventory-toolbar__field"
          aria-label="Stock status"
          placeholder=""
          options={STOCK_STATUS_OPTIONS}
          value={stockStatus}
          onChange={(event) => onStockStatusChange(event.target.value)}
        />

        <Select
          className="inventory-toolbar__field"
          aria-label="Expiry"
          placeholder=""
          options={EXPIRY_OPTIONS}
          value={expiry}
          onChange={(event) => onExpiryChange(event.target.value)}
        />
      </div>

      <div className="inventory-toolbar__actions">
        <Button variant="outline" onClick={onReset}>
          Reset Filters
        </Button>
      </div>
    </div>
  );
}

export default InventoryToolbar;
