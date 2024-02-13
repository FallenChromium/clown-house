from passlib.hash import argon2

def hash(password):
    return argon2.hash(password)

def verify(password, hash):
    return argon2.verify(hash, password)