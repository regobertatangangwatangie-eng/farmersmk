# School Service – Full Specification

## 1. School Registration & Sign-In Flow
- **Landing page:** School sign-up form (fields: School name, Location, Proprietor name, Fee payment number, Payment method, other details)
- **After sign-up:** School sign-in page for the registered school
- **After sign-in:** Access to the School Service mini dashboard

## 2. Mini Dashboard Features
After sign-up and sign-in, the dashboard displays the following buttons and features:

### 1. Registration of Student / Pupil / Kids
- Opens a form to register students, pupils, or kids
- Captures all required details depending on school level

### 2. Class List
- Generates a class list from registered students
- Automatically sorts students into their classes

### 3. Class Subject List
- Shows all subjects taught in the specific class the student belongs to
- Follows government curriculum/system

### 4. Fees Payment
- Shows:
  - Total fees for the student
  - Amount already paid
  - Amount being paid now
  - Balance remaining
- Generates a receipt with payment details and updated balance
- Sends receipt to parent’s phone and keeps a copy in the office
- Notifies parent with the mobile money number to use for payment

### 5. Balance Sheet
- Shows school’s financial summary:
  - Total money received
  - Total spent and what it was spent on
  - Remaining balance

### 6. Payment of Teachers
- Generates a list of all teachers
- Enter payment amount for each teacher
- On submit:
  - Generates pay slips for all teachers
  - Pays each teacher directly into their account (mobile money, Orange Money, bank, Visa, Mastercard, etc.)

### 7. Pay Slip Generation
- Generates individual pay slips showing:
  - Gross pay
  - Deductions for social insurance
  - Tax
  - Net pay
- All details for each teacher’s pay slip are generated automatically

## 3. Payment Flow & Platform Commission
- **School registration fee:** $5 (integrates school into platform)
- **Fee collection:** Parents pay directly to school’s provided account/number (MTN Mobile Money, Orange Money, Bank, Card)
- **Platform commission:** $0.25 is automatically sent to the platform’s account for every fee payment
  - Platform Mobile Money Number (Cameroon): +237 675 142 175
- **Receipts & notifications:** Sent to parent’s phone and stored in office
- **Future:** Electronic card payments for international payments

---

This document merges the School Service flow and mini dashboard features for implementation and reference.
