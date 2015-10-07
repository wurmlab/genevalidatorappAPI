#!/bin/bash
set -e # exit with nonzero exit code if anything fails

# This builds the API js and also updates the gh-branch with the latest files.
# This file can only push to the gh-branch using travis.

gitPos=$(git rev-parse --short HEAD)

mkdir www

cp -r build www/build
cp demo/genevalidatorappAPI-demo.html www/index.html

cd www

ruby -pi -e "gsub('../build/', 'build/')" index.html

git init
git config user.name "IsmailM"
git config user.email "ismail.moghul@gmail.com"

git remote add upstream "https://$GH_TOKEN@github.com/wurmlab/genevalidatorappAPI.git"

git fetch upstream
git reset upstream/gh-pages

touch .

git add -A .
git commit -m "build website at ${gitPos}"
git push upstream HEAD:gh-pages
