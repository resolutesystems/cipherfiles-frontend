#!/bin/bash

pnpm build
rm -r /var/www/cipherfiles
mv dist/ /var/www/cipherfiles
