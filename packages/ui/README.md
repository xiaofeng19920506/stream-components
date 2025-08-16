# Stream Components UI Library

A React component library with consistent design tokens and CSS Modules.

## Installation

```bash
npm install @xiaofeng19920506/ui
```

## Components

### SearchableSelect

A searchable dropdown component with support for action buttons.

```tsx
import { SearchableSelect } from '@xiaofeng19920506/ui';

const options = [
  { label: 'Option 1', value: '1' },
  { label: 'Option 2', value: '2' },
  { label: 'Option 3', value: '3' },
];

// Basic usage
<SearchableSelect
  options={options}
  value={selectedValue}
  onChange={setSelectedValue}
  placeholder="Search options..."
/>

// With action button when input is empty
<SearchableSelect
  options={options}
  value={selectedValue}
  onChange={setSelectedValue}
  placeholder="Search options..."
  showEmptyAction={true}
  emptyActionIcon={<PlusIcon />}
  onEmptyActionClick={() => console.log('Add new option')}
/>

// With input action button (when there's a value or query)
<SearchableSelect
  options={options}
  value={selectedValue}
  onChange={setSelectedValue}
  placeholder="Search options..."
  inputActionIcon={<ClearIcon />}
  onInputActionClick={() => setSelectedValue(null)}
/>

// With legacy option action icons
const optionsWithActions = [
  { 
    label: 'Option 1', 
    value: '1',
    actionIcon: <EditIcon />,
    onActionClick: (option) => console.log('Edit', option)
  },
  { 
    label: 'Option 2', 
    value: '2',
    actionIcon: <DeleteIcon />,
    onActionClick: (option) => console.log('Delete', option)
  },
];

<SearchableSelect
  options={optionsWithActions}
  value={selectedValue}
  onChange={setSelectedValue}
  showActionIcons={true}
/>

// With enhanced option actions (multiple actions per option)
const optionsWithEnhancedActions = [
  {
    label: 'Option 1',
    value: '1',
    actions: [
      {
        icon: <EditIcon />,
        onClick: (option) => console.log('Edit', option),
        title: 'Edit option'
      },
      {
        icon: <DeleteIcon />,
        onClick: (option) => console.log('Delete', option),
        title: 'Delete option'
      }
    ]
  }
];

// With default actions applied to all options
<SearchableSelect
  options={options}
  value={selectedValue}
  onChange={setSelectedValue}
  showOptionActions={true}
  defaultActions={[
    {
      icon: <EditIcon />,
      onClick: (option) => console.log('Edit', option),
      title: 'Edit option'
    },
    {
      icon: <DeleteIcon />,
      onClick: (option) => console.log('Delete', option),
      title: 'Delete option',
      disabled: option.value === '1' // Disable for specific options
    }
  ]}
/>
```

#### Props

| Prop | Type | Description |
|------|------|-------------|
| `options` | `SearchableOption[]` | Array of options to display |
| `value` | `string \| null` | Currently selected value |
| `onChange` | `(value: string \| null) => void` | Callback when selection changes |
| `label` | `string` | Optional label above the input |
| `placeholder` | `string` | Placeholder text for the input |
| `showActionIcons` | `boolean` | Show legacy action icons on each option |
| `inputActionIcon` | `React.ReactNode` | Icon to show when there's a value or query |
| `onInputActionClick` | `() => void` | Callback for input action icon click |
| `emptyActionIcon` | `React.ReactNode` | Icon to show when input is empty |
| `onEmptyActionClick` | `() => void` | Callback for empty action icon click |
| `showEmptyAction` | `boolean` | Enable empty action button functionality |
| `showOptionActions` | `boolean` | Enable enhanced option actions |
| `defaultActions` | `Action[]` | Default actions to apply to all options |

#### SearchableOption Type

```tsx
type SearchableOption = {
  label: string;
  value: string;
  // Legacy action support
  actionIcon?: React.ReactNode;
  onActionClick?: (option: SearchableOption) => void;
  // Enhanced action support
  actions?: Array<{
    icon: React.ReactNode;
    onClick: (option: SearchableOption) => void;
    title?: string;
    disabled?: boolean;
  }>;
};
```

#### Action Type

```tsx
type Action = {
  icon: React.ReactNode;
  onClick: (option: SearchableOption) => void;
  title?: string;
  disabled?: boolean;
};
```

### Other Components

- Button
- TextInput
- Text
- Tooltip
- Select
- ToggleSwitch
- Spinner
- Card
- Tag
- MultiSelect
- Table
- Modal
- Toast
- Form

## Usage

```tsx
import { Button, TextInput, Card } from '@xiaofeng19920506/ui';

function App() {
  return (
    <Card>
      <TextInput placeholder="Enter text..." />
      <Button>Click me</Button>
    </Card>
  );
}
```

## Styling

The library uses CSS Modules for styling. All styles are included in the package and will be automatically applied when you import the components.

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build the library
npm run build

# Start Storybook
npm run storybook
```
