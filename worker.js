//importScripts('https://binaries.soliditylang.org/bin/soljson-v0.8.19+commit.7dd6d404.js')
import wrapper from 'solc/wrapper';

self.addEventListener('message', (e) => {
    
    let solcInput = e.data.solcInput;
    solcInput['language'] = 'Solidity';
    solcInput['settings'] = {
        outputSelection: {
            '*': {
                '*': ['*']
            }
        }
    };
    
    function findImports(path) {
        return {
            contents:
              e.data.sourceFiles[path]
          };
      }

    importScripts(`https://binaries.soliditylang.org/bin/${e.data.compilerBin}`)
    const compiler = wrapper(self.Module)

    self.postMessage({
        output: JSON.parse(compiler.compile(JSON.stringify(solcInput), { import: findImports } ))
    })
}, false)
