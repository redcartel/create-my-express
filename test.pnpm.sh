set -e
set -o pipefail
echo "### TEST pnpm & JavaScript ###"
rm -rf test && pnpm start test
cd test
yarn test
PORT=9876 timeout 3 yarn dev
cat package.json
cat README.md
cd ..