# Frontend Assignment - Enterpret
## Problem statement

Build a dynamic querybuilder which can build complex query simply. Analytics platform can have a very varying access patterns, which might require complex queries. End user can't always write such queries - so querybuilder helps in building complex queries easily. 

Write it from the POV that you're writing a library which exposes the querybuilder and a way to get its output Rule in two formats - `string`, and `Rule object`.

## Artifacts
- [Figma link](https://www.figma.com/file/yyvm19dgrhD7F9Hzy6FK4e/Design-Assignment?node-id=0%3A1)
- [Loom walkthrough](https://www.loom.com/share/51184650198b44909d4eda83e555b752)
- Data model
```
export interface Rule {
  field?: 'Theme' | 'Sub-theme' | 'Reason' | 'Language' | 'Source' | 'Rating' | 'Time Period' | 'Customer ID' 
  condition?: 'Equals' | 'Does not equal' | 'Like' | 'Not like' | 'Is Empty' | 'Is' | 'Is not'
  value?: string[]
  type: 'rule'
}
export interface RuleGroup {
  children: (RuleGroup | Rule)[]
  conjunction: 'AND' | 'OR'
  not: boolean
  type: 'rule_group'
}
```

## Code structure
The querybuilder is build using react and typescript. It is exposed as a library that can be imported anywhere in our application and used by invoking it.

The `src` directory consists of the:
- `components` which imports the the query builder library
- `queryBuilderLibrary` which is the query builder to be used in our application. The main file is the `modal.tsx` file that exports the modal component.

To test the application, run:
```
npm install
npm run start
```

This will start the application on the development server. The application reads data from  `data.json` which specifies the fields, conditions and the associated value types.