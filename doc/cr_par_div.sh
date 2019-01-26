#!/bin/bash

# outputes "purpose of participants"-div for a given participant (as first argument)
# used for communication.html

printf "<div id=\"$1\">\n\
     <h3>$1</h3>\n\
\n\
     <p>\n\
          <b>from</b>\n\
          <ul>\n\
               <li>\n\
                    <b>dummy</b>\n\
               </li>\n\
          </ul>\n\
\n\
          <b>to</b>\n\
          <ul>\n\
               <li>\n\
                    <b>dummy</b>\n\
               </li>\n\
          </ul>\n\
     </p>\n\
</div>\n"\
