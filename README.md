# rtc-screenshare chrome extension

These are the chrome extension source files and build process that can be used to create your own custom extension.

do
```
git clone https://github.com/rtc-io/rtc-screenshare-extension.git
npm install
```

edit src/manifest.json

and Change the http://*.rtc.io/* to your needs.
after that change back to the main directory and run
```
gulp package
```

go to https://chrome.google.com/webstore/developer/dashboard
and upload the build.zip

## License(s)

### Apache 2.0

Copyright 2015 National ICT Australia Limited (NICTA)

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
