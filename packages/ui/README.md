# Stream Components UI Library

A React component library with consistent design tokens and CSS Modules.

## Installation

```bash
npm install @xiaofeng19920506/ui
```

## Components

### SearchableSelect

A searchable dropdown component with support for action buttons and object-based options.

```tsx
import { SearchableSelect } from '@xiaofeng19920506/ui';

// Basic usage with simple options
const options = [
  { label: 'Option 1', value: '1' },
  { label: 'Option 2', value: '2' },
  { label: 'Option 3', value: '3' },
];

<SearchableSelect
  options={options}
  value={selectedValue}
  onChange={setSelectedValue}
  placeholder="Search options..."
/>

// Object-based options with custom fields
interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  department: string;
}

const userOptions: User[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', department: 'IT' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', department: 'HR' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Manager', department: 'Sales' },
];

// Using custom display and value fields
<SearchableSelect<User>
  options={userOptions}
  value={selectedUserId}
  onChange={(value, option) => {
    setSelectedUserId(value);
    console.log('Selected user:', option);
  }}
  displayField="name"
  valueField="id"
  searchableFields={['name', 'email', 'department']}
  placeholder="Search users..."
/>

// Using custom getter functions
<SearchableSelect<User>
  options={userOptions}
  value={selectedUserId}
  onChange={(value, option) => setSelectedUserId(value)}
  getOptionLabel={(user) => `${user.name} (${user.role})`}
  getOptionValue={(user) => user.id}
  searchableFields={['name', 'email']}
  placeholder="Search users..."
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

| Prop                 | Type                                                                  | Description                                 |
| -------------------- | --------------------------------------------------------------------- | ------------------------------------------- |
| `options`            | `ObjectOption<T>[]`                                                   | Array of options to display                 |
| `value`              | `string \| number \| null`                                            | Currently selected value                    |
| `onChange`           | `(value: string \| number \| null, option?: ObjectOption<T>) => void` | Callback when selection changes             |
| `label`              | `string`                                                              | Optional label above the input              |
| `placeholder`        | `string`                                                              | Placeholder text for the input              |
| `showActionIcons`    | `boolean`                                                             | Show legacy action icons on each option     |
| `inputActionIcon`    | `React.ReactNode`                                                     | Icon to show when there's a value or query  |
| `onInputActionClick` | `() => void`                                                          | Callback for input action icon click        |
| `emptyActionIcon`    | `React.ReactNode`                                                     | Icon to show when input is empty            |
| `onEmptyActionClick` | `() => void`                                                          | Callback for empty action icon click        |
| `showEmptyAction`    | `boolean`                                                             | Enable empty action button functionality    |
| `showOptionActions`  | `boolean`                                                             | Enable enhanced option actions              |
| `defaultActions`     | `Action[]`                                                            | Default actions to apply to all options     |
| `getOptionLabel`     | `(option: ObjectOption<T>) => string`                                 | Custom function to get option label         |
| `getOptionValue`     | `(option: ObjectOption<T>) => string \| number`                       | Custom function to get option value         |
| `searchableFields`   | `(keyof T)[]`                                                         | Fields to search in for object options      |
| `displayField`       | `keyof T \| 'label'`                                                  | Field to use for display (default: 'label') |
| `valueField`         | `keyof T \| 'value'`                                                  | Field to use for value (default: 'value')   |

#### ObjectOption Type

```tsx
type ObjectOption<T = any> = T & {
  label: string;
  value: string | number;
  // Legacy action support
  actionIcon?: React.ReactNode;
  onActionClick?: (option: ObjectOption<T>) => void;
  // Enhanced action support
  actions?: Array<{
    icon: React.ReactNode;
    onClick: (option: ObjectOption<T>) => void;
    title?: string;
    disabled?: boolean;
  }>;
};
```

#### Action Type

```tsx
type Action = {
  icon: React.ReactNode;
  onClick: (option: ObjectOption<T>) => void;
  title?: string;
  disabled?: boolean;
};
```

#### Legacy SearchableOption Type

```tsx
// For backward compatibility
type SearchableOption = ObjectOption;
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
import { Button, TextInput, Card } from "@xiaofeng19920506/ui";

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
