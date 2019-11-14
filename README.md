# CFLint Scan

**CFLint** is a linter for CFML and you can find more information at its [GitHub repository](https://github.com/cflint/CFLint). This extension integrates **CFLint** into your builds.

## Features

### Linting

This extension uses the **CFLint** tool to scan CFML files and provide feedback on potential issues through the editor and Problems view of VS Code. The ways in which this is triggered are configurable in the [Settings](#settings). The defaults are only to run when CFML files are opened or saved. The linter optionally takes rule configuration via a `.cflintrc` file, for which details can be found at [**CFLint**'s repo](https://github.com/cflint/CFLint#folder-based-configuration). This extension facilitates the creation and viewing of this file via [Commands](#commands). It also facilitates editing the file by utilizing the schema.


## Known Issues/Limitations

1. Not an issue with the extension itself, but be aware that **CFLint** is a heavy/slow application compared to most linters, especially when used through the command line. Some things are done with the extension to account for this.
1. As of this writing, **CFLint** (v1.4.1) often misreports issue location.

