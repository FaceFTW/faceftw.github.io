{
  description = "";
  inputs = {

    nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";
  };

  outputs =
    { nixpkgs, ... }@inputs:
    let
      pkgs = inputs.nixpkgs.legacyPackages."x86_64-linux";
    in
    {
      devShells.x86_64-linux.default = pkgs.mkShell {
        packages = [
          pkgs.nodejs_26
          pkgs.biome
          pkgs.vtsls
        ];
      };
    };
}
