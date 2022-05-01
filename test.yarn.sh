set -e
set -o pipefail
echo "### TEST yarn & JavaScript ###"
rm -rf test && node index.js --yarn test
cd test
yarn test
PORT=9876 timeout 3 yarn dev
cat package.json
cat README.md
cd ..