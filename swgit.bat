@ECHO OFF

SET mypath=%~dp0

node "%mypath:~0,-1%"\index.js "%mypath:~0,-1%"

@ECHO ON