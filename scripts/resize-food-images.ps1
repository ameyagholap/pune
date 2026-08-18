Add-Type -AssemblyName PresentationCore

$srcDir = "C:\Work\pune\images\food"
$maxEdge = 1600
$quality = 78

Get-ChildItem -Path $srcDir -Filter "*-orig.*" | ForEach-Object {
    $inFile = $_.FullName
    $slug = $_.BaseName -replace '-orig$', ''
    $outFile = Join-Path $srcDir ($slug + ".jpg")

    try {
        $uri = New-Object System.Uri($inFile)
        $decoder = [System.Windows.Media.Imaging.BitmapDecoder]::Create(
            $uri,
            [System.Windows.Media.Imaging.BitmapCreateOptions]::None,
            [System.Windows.Media.Imaging.BitmapCacheOption]::OnLoad
        )
        $frame = $decoder.Frames[0]
        $w = $frame.PixelWidth
        $h = $frame.PixelHeight

        $scale = 1.0
        if ($w -gt $h -and $w -gt $maxEdge) { $scale = $maxEdge / [double]$w }
        elseif ($h -ge $w -and $h -gt $maxEdge) { $scale = $maxEdge / [double]$h }

        if ($scale -lt 1.0) {
            $transform = New-Object System.Windows.Media.ScaleTransform($scale, $scale)
            $scaled = New-Object System.Windows.Media.Imaging.TransformedBitmap($frame, $transform)
            $finalFrame = [System.Windows.Media.Imaging.BitmapFrame]::Create($scaled)
        } else {
            $finalFrame = $frame
        }

        $encoder = New-Object System.Windows.Media.Imaging.JpegBitmapEncoder
        $encoder.QualityLevel = $quality
        $encoder.Frames.Add($finalFrame)

        $stream = [System.IO.File]::Open($outFile, [System.IO.FileMode]::Create)
        $encoder.Save($stream)
        $stream.Close()

        $outSize = (Get-Item $outFile).Length
        Write-Output ("{0}: {1}x{2} -> {3} ({4} KB)" -f $slug, $w, $h, $outFile, [math]::Round($outSize/1KB))
    } catch {
        Write-Output ("{0}: FAILED - {1}" -f $slug, $_.Exception.Message)
    }
}
