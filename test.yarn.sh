set -e
set -o pipefail
echo "### TEST yarn & JavaScript ###"
rm -rf test && yarn start test
cd test
yarn test
PORT=9876 timeout 3 yarn dev
cat package.json
cat README.md
cd ..