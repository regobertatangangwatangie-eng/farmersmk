# School Service Forms & Dashboard – UI and DB Spec

## 1. Registration of Student / Pupil / Kids
### UI Form Fields
- Articulation number (registration number)
- Student name
- Registration fee
- Total fees
- Amount to be paid now
- Balance to be paid
- Class (dropdown or text)
- Section (dropdown, options depend on school type):
  - Primary: French, English
  - Nursery: English
  - Secondary: General, Technical, Commercial, etc.
  - Specific class: Form 1, Form 2, Form 3, Form 4, etc.

### DB Table: students
| Field              | Type        | Description                       |
|--------------------|------------|-----------------------------------|
| id                 | SERIAL PK   | Unique ID                         |
| articulation_no    | VARCHAR     | Registration number               |
| name               | VARCHAR     | Student name                      |
| registration_fee   | NUMERIC     | Registration fee                  |
| total_fees         | NUMERIC     | Total fees                        |
| amount_paid        | NUMERIC     | Amount paid so far                |
| balance            | NUMERIC     | Balance to be paid                |
| class              | VARCHAR     | Class                             |
| section            | VARCHAR     | Section                           |
| created_at         | TIMESTAMP   | Registration date                 |

## 2. Class List
### UI
- Enter student names one by one (input + add button)
- After each entry, move to next
- Enter subjects for the class (multi-input or textarea)

### DB Table: classes
| Field      | Type      | Description         |
|------------|-----------|---------------------|
| id         | SERIAL PK | Unique ID           |
| name       | VARCHAR   | Class name          |
| section    | VARCHAR   | Section             |
| subjects   | TEXT[]    | List of subjects    |

## 3. Payment of Fees
### UI
- Select student (dropdown or search)
- Show:
  - Total amount to pay
  - Amount already paid
  - Amount being paid now (input)
  - Balance after payment (auto-calc)
- Generate receipt (display/print)

### DB Table: payments
| Field         | Type      | Description                |
|--------------|-----------|----------------------------|
| id           | SERIAL PK | Unique ID                  |
| student_id   | INT FK    | Linked student             |
| amount       | NUMERIC   | Amount paid                |
| date         | TIMESTAMP | Payment date               |
| receipt_no   | VARCHAR   | Receipt number             |

## 4. Balance Sheet
### UI
- List all income and expenditure
- For each entry: amount, type (income/expenditure), description, date

### DB Table: balance_sheet
| Field         | Type      | Description                |
|--------------|-----------|----------------------------|
| id           | SERIAL PK | Unique ID                  |
| type         | VARCHAR   | income/expenditure         |
| source       | VARCHAR   | Source (fees, reg, etc.)   |
| description  | TEXT      | What it was used for       |
| amount       | NUMERIC   | Amount                     |
| date         | TIMESTAMP | Date                       |

## 5. Payment of Teachers
### UI
- List of teachers (name, number)
- Amount to be paid (input per teacher)
- Submit button

### DB Table: teachers
| Field         | Type      | Description                |
|--------------|-----------|----------------------------|
| id           | SERIAL PK | Unique ID                  |
| name         | VARCHAR   | Teacher name               |
| number       | VARCHAR   | Teacher’s number           |
| account      | VARCHAR   | Payment account/number     |

### DB Table: teacher_payments
| Field         | Type      | Description                |
|--------------|-----------|----------------------------|
| id           | SERIAL PK | Unique ID                  |
| teacher_id   | INT FK    | Linked teacher             |
| amount       | NUMERIC   | Amount paid                |
| date         | TIMESTAMP | Payment date               |

## 6. Pay Slip
### UI
- For each teacher, show:
  - Gross pay
  - Deductions (social insurance, tax, etc.)
  - Net pay
- Print button

### DB Table: pay_slips
| Field         | Type      | Description                |
|--------------|-----------|----------------------------|
| id           | SERIAL PK | Unique ID                  |
| teacher_id   | INT FK    | Linked teacher             |
| gross        | NUMERIC   | Gross pay                  |
| insurance    | NUMERIC   | Social insurance           |
| tax          | NUMERIC   | Tax                        |
| net          | NUMERIC   | Net pay                    |
| date         | TIMESTAMP | Date                       |

---

This spec provides a clear UI and database structure for the School Service dashboard and forms. Adjust field types as needed for your backend (PostgreSQL, MySQL, etc.).
