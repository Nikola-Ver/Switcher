@ECHO OFF

SET mypath=%~dp0

IF "%1" == "" (
    node "%mypath:~0,-1%"\index.js "%mypath:~0,-1%"
) ELSE (
    IF "%1" == "c" (
        git config user.name
        git config user.email
    ) 
)

@ECHO ON