import { Button, SearchInput, Select } from '../../components/common';
import { DATE_FILTER_OPTIONS } from '../../constants/sales';
import { HiOutlineArrowDownTray } from 'react-icons/hi2';
import './SalesToolbar.css';

function SalesToolbar({
  search,
  date,
  onSearchChange,
  onDateChange,
  onExport,
}) {
  return (
    <div className="sales-toolbar">
      <div className="sales-toolbar__filters">
        <div className="sales-toolbar__search">
          <SearchInput
            placeholder="Search invoice..."
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            aria-label="Search invoice"
          />
        </div>

        <Select
          className="sales-toolbar__field"
          aria-label="Date filter"
          placeholder=""
          options={DATE_FILTER_OPTIONS}
          value={date}
          onChange={(event) => onDateChange(event.target.value)}
        />
      </div>

      <div className="sales-toolbar__actions">
        <Button
          variant="outline"
          icon={<HiOutlineArrowDownTray size={18} />}
          onClick={onExport}
        >
          Export CSV
        </Button>
      </div>
    </div>
  );
}

export default SalesToolbar;
