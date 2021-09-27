@REM 使用bandzip压缩成zip文件
bz c zhihu-mobile-web-chromium.zip -r -ex:"*.zip;.git\*;" . -fmt:zip
@REM 按照文档尝试了无法排除.git目录，只好先压缩了再重中删除
bz d zhihu-mobile-web-chromium.zip ".git\*"