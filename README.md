# Valor Jobs & Qualifications browser

## Motivation

At some point, every software development company realizes the importance of establishing qualification requirements and career maps for its developers.

The motivation behind this can vary. It might be to provide clear guidelines for career promotion, salary increases, or simply for the sake of continuous learning and skill development.

While there isn't a one-size-fits-all approach to this, we concluded that having a reference point is crucial. This allows developers to identify areas for improvement, and it gives our clients a clear understanding of our team's qualifications, fostering a level of transparency they can appreciate.

This realization led us to create a set of YAML documents that map jobs to their respective qualification requirements. You can explore these documents here: [valor-labs/valor-jobs](https://github.com/valor-labs/valor-jobs-browser). The repository also includes the YAML schema detailing the structure and format of these documents.

To make browsing these documents easier, we developed **this** application: [valor-labs/valor-jobs-browser](https://github.com/valor-labs/valor-jobs-browser). The application features "Jobs" and "Qualifications" menu items for intuitive navigation. Users can enter "Edit mode" by switching on the slider at the top, allowing them to modify the data as needed. However, changes are not saved automatically; users need to copy the generated YAML from the Export dialog and create pull requests in GitHub to persist their modifications.

## Deployment

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests (not yet implemented)

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

### Further help

In case of any questions, please write dmitriy.barbashov@valor-software.com
