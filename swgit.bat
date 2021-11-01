@ECHO OFF

IF "%1" == "" (
    node index.js
) ELSE (
    IF "%1" == "c" (
        git config user.name
        git config user.email
    ) 
)

@ECHO ON