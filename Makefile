FILE=./src/typing.d.ts

rewrite:
	@sed -i '' -E '/export/!s/(declare (type|class|enum|interface))/export \1/g' $(FILE)
