import { Button, SearchInput, Select } from '../../components/common';
import {
  SEARCH_BY_OPTIONS,
  STATUS_FILTER_OPTIONS,
  PRIORITY_FILTER_OPTIONS,
  DATE_FILTER_OPTIONS,
} from '../../constants/prescriptions';
import './PrescriptionToolbar.css';

function PrescriptionToolbar({
  search,
  searchBy,
  status,
  priority,
  date,
  onSearchChange,
  onSearchByChange,
  onStatusChange,
  onPriorityChange,
  onDateChange,
  onReset,
}) {
  return (
    <div className="rx-toolbar">
      <div className="rx-toolbar__filters">
        <div className="rx-toolbar__search">
          <SearchInput
            placeholder="Search prescription..."
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            aria-label="Search prescription"
          />
        </div>

        <Select
          className="rx-toolbar__field"
          aria-label="Search by"
          placeholder=""
          options={SEARCH_BY_OPTIONS}
          value={searchBy}
          onChange={(event) => onSearchByChange(event.target.value)}
        />

        <Select
          className="rx-toolbar__field"
          aria-label="Verification status"
          placeholder=""
          options={STATUS_FILTER_OPTIONS}
          value={status}
          onChange={(event) => onStatusChange(event.target.value)}
        />

        <Select
          className="rx-toolbar__field"
          aria-label="Priority"
          placeholder=""
          options={PRIORITY_FILTER_OPTIONS}
          value={priority}
          onChange={(event) => onPriorityChange(event.target.value)}
        />

        <Select
          className="rx-toolbar__field"
          aria-label="Prescription date"
          placeholder=""
          options={DATE_FILTER_OPTIONS}
          value={date}
          onChange={(event) => onDateChange(event.target.value)}
        />
      </div>

      <div className="rx-toolbar__actions">
        <Button variant="outline" onClick={onReset}>
          Reset Filters
        </Button>
      </div>
    </div>
  );
}

export default PrescriptionToolbar;
